import { Resend } from "resend"

const PRODUCT_VALUE_MZN = 429

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured")
    return Response.json({ error: "Email service not configured" }, { status: 500 })
  }

  let purchaseId: string | undefined
  try {
    const body = await request.json()
    if (typeof body?.purchaseId === "string" && /^[a-zA-Z0-9-]{8,64}$/.test(body.purchaseId)) {
      purchaseId = body.purchaseId
    }
  } catch {
    // corpo vazio ou inválido: segue sem idempotência
  }

  try {
    const resend = new Resend(apiKey)
    const purchasedAt = new Date().toLocaleString("en-US", {
      timeZone: "Africa/Maputo",
      dateStyle: "medium",
      timeStyle: "short",
    })

    // A idempotencyKey garante que o Resend não envie o mesmo e-mail duas vezes
    // para a mesma compra (ex.: retries de rede ou recarregamento da página).
    const { data, error } = await resend.emails.send(
      {
      from: "Sales Notifications <onboarding@resend.dev>",
      to: ["gimomendes15@gmail.com"],
      subject: `New Purchase Completed - ${PRODUCT_VALUE_MZN} MZN`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #10b981; text-align: center;">New Purchase Completed!</h1>
          <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="font-size: 16px; color: #374151; margin: 0 0 12px 0;">
              A customer has just completed a purchase and landed on the success page.
            </p>
            <table style="width: 100%; font-size: 14px; color: #374151; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #6b7280;">Product</td>
                <td style="padding: 6px 0; text-align: right; font-weight: bold;">VIP Digital Account</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6b7280;">Amount</td>
                <td style="padding: 6px 0; text-align: right; font-weight: bold;">${PRODUCT_VALUE_MZN} MZN</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6b7280;">Date</td>
                <td style="padding: 6px 0; text-align: right;">${purchasedAt}</td>
              </tr>
            </table>
          </div>
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            The Meta Pixel Purchase event has been fired for this visit.
          </p>
        </div>
      `,
      },
      purchaseId ? { idempotencyKey: `vip-purchase/${purchaseId}` } : undefined,
    )

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: "Failed to send email" }, { status: 500 })
  }
}
