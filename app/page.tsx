// Componente Upsell
const UpsellScreen = ({ quizAnswers, onAccept, onReject }: { quizAnswers: any; onAccept: () => void; onReject: () => void }) => {
  const [loading, setLoading] = useState(false)

  const handleUpsell = (accept: boolean) => {
    setLoading(true)
    const randomTime = 6000 + Math.random() * 4000
    setTimeout(() => {
      if (accept) {
        onAccept()
      } else {
        onReject()
      }
    }, randomTime)
  }

  if (loading) {
    return <LoadingScreen stage="upsell" progress={70} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex flex-col items-center justify-center px-4 py-8"
    >
      <div className="w-full max-w-2xl">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Potencialize sua experiência!</h1>
          <p className="text-gray-600 text-lg">Ative o Modo App Seguro e tenha acesso a benefícios exclusivos</p>
        </motion.div>

        {/* Card do Upsell */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border-2 border-green-200 relative overflow-hidden"
        >
          {/* Badge de desconto */}
          <motion.div
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            -60% OFF
          </motion.div>

          {/* Preço */}
          <div className="mb-8">
            <p className="text-gray-600 text-sm mb-2">Investimento especial:</p>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold text-green-600">399 MZN</span>
              <span className="text-2xl text-gray-400 line-through">999 MZN</span>
            </div>
            <p className="text-green-600 font-semibold mt-2">Apenas por tempo limitado!</p>
          </div>

          {/* Benefícios */}
          <div className="space-y-3 mb-8">
            <h3 className="font-bold text-gray-800 mb-4">Com o Modo App Seguro você tem:</h3>
            {[
              { icon: '✓', text: 'Acesso completo ao app no seu dispositivo' },
              { icon: '✓', text: 'Atendimento prioritário 24/7' },
              { icon: '✓', text: 'Taxas zero em todas as transações' },
              { icon: '✓', text: 'Proteção e segurança anti-bloqueios' },
              { icon: '✓', text: 'Garantia de satisfação' },
              { icon: '✓', text: 'Novas atualizações automáticas' }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 text-gray-700"
              >
                <span className="text-green-600 font-bold text-lg">{benefit.icon}</span>
                <span>{benefit.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Botões */}
          <div className="space-y-3">
            {/* BOTÃO PRINCIPAL - REDIRECIONA PARA CHECKOUT */}
            <motion.a
              href="https://pay.tutora.co.mz/e6cc1edc66244aa7b142f8049459b73b"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all relative overflow-hidden text-lg block text-center"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative">ATIVAR MODO APP SEGURO</span>
            </motion.a>

            {/* BOTÃO SECUNDÁRIO - CONTINUAR SEM UPSELL */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleUpsell(false)}
              className="w-full bg-gray-100 text-gray-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all text-sm"
            >
              Continuar sem o Modo App
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
