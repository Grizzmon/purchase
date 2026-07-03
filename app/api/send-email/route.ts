import { Resend } from "resend"

const resend = new Resend("re_KN16Uhgo_NPcpzWEXKwFwV1GvhhyJPjDM")

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Notificacao <onboarding@resend.dev>",
      to: ["gimomendes15@gmail.com"],
      subject: "Nova Compra Realizada!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #10b981; text-align: center;">Nova Compra Realizada!</h1>
          <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="font-size: 16px; color: #374151; margin: 0;">
              Um cliente acabou de completar uma compra e foi direcionado para a pagina de sucesso.
            </p>
          </div>
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            Data: ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
          </p>
        </div>
      `,
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: "Erro ao enviar email" }, { status: 500 })
  }
}
