'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Smartphone, Wifi, Zap, Loader, ChevronDown } from 'lucide-react'
import Image from 'next/image'

declare global {
  interface Window {
    fbq?: (action: string, event: string, data?: object) => void
  }
}

// Mensagens dinâmicas para loadings
const LOADING_MESSAGES = {
  initial: ['Conectando servidor...', 'Validando pagamento...', 'Processando dados...', 'Sincronizando sistema...'],
  quiz: ['Analisando respostas...', 'Processando perfil...', 'Gerando recomendações...', 'Configurando dispositivo...'],
  upsell: ['Calculando benefícios...', 'Preparando oferta...', 'Gerando cupom...', 'Ativando recursos...'],
  final: ['Enviando confirmação...', 'Preparando acesso...', 'Gerando credenciais...', 'Completando registro...']
}

// Componente LoadingScreen Ultra Premium
const LoadingScreen = ({ stage = 'initial', progress = 0 }: { stage?: string; progress?: number }) => {
  const [currentMessage, setCurrentMessage] = useState(0)
  const messages = LOADING_MESSAGES[stage as keyof typeof LOADING_MESSAGES] || LOADING_MESSAGES.initial

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background com imagem fullscreen */}
      <div className="absolute inset-0">
        <Image
          src="/hero-woman.png"
          alt="Loading"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 via-emerald-700/50 to-green-900/70"></div>
      </div>

      {/* Efeito de partículas */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-300 rounded-full"
            animate={{
              y: [0, -200, -400],
              opacity: [0, 1, 0],
              x: Math.sin(i) * 100
            }}
            transition={{
              duration: 3 + i * 0.1,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Spinner Premium */}
        <motion.div
          className="relative w-40 h-40 mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          {/* Anel externo com gradiente */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad1)" strokeWidth="2" opacity="0.3" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="3"
              strokeDasharray="283"
              strokeDashoffset="283"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>

          {/* Centro pulsante */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl"
            style={{
              boxShadow: '0 0 40px rgba(16, 185, 129, 0.8), inset 0 0 40px rgba(16, 185, 129, 0.3)'
            }}
            animate={{
              scale: [0.9, 1.1, 0.9],
              boxShadow: [
                '0 0 20px rgba(16, 185, 129, 0.5)',
                '0 0 60px rgba(16, 185, 129, 1)',
                '0 0 20px rgba(16, 185, 129, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="text-white w-16 h-16 drop-shadow-lg" />
          </motion.div>
        </motion.div>

        {/* Barra de progresso */}
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-8 backdrop-blur-sm border border-white/30">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)'
            }}
          />
        </div>

        {/* Mensagem dinâmica */}
        <motion.div
          className="text-center"
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
            {messages[currentMessage]}
          </h2>
          <p className="text-white/70 text-sm">Por favor aguarde...</p>
        </motion.div>
      </div>
    </div>
  )
}

// Componente Quiz
const QuizScreen = ({ onComplete }: { onComplete: (answers: any) => void }) => {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState({ device: '', internet: '' })

  const handleAnswerDevice = (device: string) => {
    setLoading(true)
    const randomTime = 6000 + Math.random() * 4000
    setTimeout(() => {
      setAnswers(prev => ({ ...prev, device }))
      setStep(1)
      setLoading(false)
    }, randomTime)
  }

  const handleAnswerInternet = (internet: string) => {
    setLoading(true)
    const randomTime = 6000 + Math.random() * 4000
    setTimeout(() => {
      setAnswers(prev => ({ ...prev, internet }))
      onComplete({ ...answers, internet })
    }, randomTime)
  }

  if (loading) {
    return <LoadingScreen stage="quiz" progress={step === 0 ? 30 : 60} />
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-emerald-100 flex flex-col items-center justify-center px-4 py-8"
      >
        <div className="w-full max-w-md">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              <motion.div
                className={`h-2 flex-1 rounded-full ${step === 0 ? 'bg-green-500' : 'bg-green-200'}`}
                animate={{ scaleX: step === 0 ? 1 : 0.8 }}
              />
              <motion.div
                className={`h-2 flex-1 rounded-full ${step === 1 ? 'bg-green-500' : 'bg-green-200'}`}
                animate={{ scaleX: step === 1 ? 1 : 0.8 }}
              />
            </div>
            <p className="text-sm text-gray-600">Pergunta {step + 1} de 2</p>
          </div>

          {step === 0 ? (
            // Primeira pergunta
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Em qual dispositivo você pretende usar o app?</h2>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerDevice('Android')}
                className="w-full p-6 bg-white border-2 border-green-200 rounded-xl text-left hover:border-green-500 hover:bg-green-50 transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <Smartphone className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-bold text-gray-800">Android</p>
                    <p className="text-sm text-gray-600">Smartphone com sistema Android</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerDevice('iPhone')}
                className="w-full p-6 bg-white border-2 border-green-200 rounded-xl text-left hover:border-green-500 hover:bg-green-50 transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <Smartphone className="w-8 h-8 text-gray-800" />
                  <div>
                    <p className="font-bold text-gray-800">iPhone</p>
                    <p className="text-sm text-gray-600">iPhone com sistema iOS</p>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          ) : (
            // Segunda pergunta
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Você tem internet com frequência?</h2>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerInternet('Sim')}
                className="w-full p-6 bg-white border-2 border-green-200 rounded-xl text-left hover:border-green-500 hover:bg-green-50 transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <Wifi className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-bold text-gray-800">Sim</p>
                    <p className="text-sm text-gray-600">Tenho internet sempre disponível</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerInternet('Não')}
                className="w-full p-6 bg-white border-2 border-green-200 rounded-xl text-left hover:border-green-500 hover:bg-green-50 transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <Wifi className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="font-bold text-gray-800">Não</p>
                    <p className="text-sm text-gray-600">Minha conexão é limitada</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerInternet('Às vezes')}
                className="w-full p-6 bg-white border-2 border-green-200 rounded-xl text-left hover:border-green-500 hover:bg-green-50 transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <Wifi className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="font-bold text-gray-800">Às vezes</p>
                    <p className="text-sm text-gray-600">Minha conexão é intermitente</p>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

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
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleUpsell(true)}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all relative overflow-hidden text-lg"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative">ATIVAR MODO APP SEGURO</span>
            </motion.button>

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

// Tela Final
const FinalScreen = ({ accepted, quizAnswers }: { accepted: boolean; quizAnswers: any }) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase")
    }
    fetch("/api/send-email", { method: "POST" }).catch(() => {})
  }, [])

  if (accepted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      >
        {/* Confetti efeito */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            animate={{
              y: [0, 500],
              x: Math.sin(i) * 300,
              opacity: [1, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.05,
              repeat: Infinity
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10px`
            }}
          />
        ))}

        <div className="relative z-10 text-center max-w-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Check className="w-12 h-12 text-green-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Parabéns!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl text-white/90 mb-8 drop-shadow-lg"
          >
            Modo App Seguro Ativado com Sucesso!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/20 backdrop-blur-md rounded-xl p-8 mb-8 border border-white/30"
          >
            <p className="text-white text-lg mb-4">Agora você tem acesso a:</p>
            <div className="text-white/90 space-y-2 text-sm">
              <p>✓ App instalado no seu {quizAnswers?.device || 'dispositivo'}</p>
              <p>✓ Atendimento prioritário ativo</p>
              <p>✓ Proteção anti-bloqueios configurada</p>
              <p>✓ Conexão otimizada para sua internet</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-white text-sm mb-2">Link do seu Upsell:</p>
              <code className="text-green-200 break-all text-xs">
                {/* SEU_LINK_DO_UPSELL_AQUI */}
                https://seu-link-do-upsell.com
              </code>
              <p className="text-white/70 text-xs mt-2">Cole este link no navegador para completar a ativação</p>
            </div>

            <p className="text-white/80 text-sm">
              Em breve você receberá um email com todas as informações. Isso leva em média 1h, podendo durar mais em alguns casos.
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
    >
      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
        >
          <Check className="w-12 h-12 text-blue-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-bold text-white mb-4 drop-shadow-lg"
        >
          Muito Obrigado!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl text-white/90 mb-8 drop-shadow-lg"
        >
          Tudo Certo!
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white/80 text-lg mb-8"
        >
          Em breve você receberá um email com todas as informações sobre sua compra. Isso leva em média 1h, podendo durar mais em alguns casos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/30"
        >
          <p className="text-white font-semibold mb-2">Obrigado por sua confiança!</p>
          <p className="text-white/70 text-sm">Seu acesso está sendo configurado. Verifique seu email em alguns momentos.</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Página Principal
export default function Home() {
  const [stage, setStage] = useState('initial')
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState(null)
  const [upsellAccepted, setUpsellAccepted] = useState(false)

  useEffect(() => {
    // Meta Pixel PageView
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("init", "829061486173119")
      window.fbq("track", "PageView")
    }

    // Loading inicial
    const randomTime = 6000 + Math.random() * 4000
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90))
    }, 300)

    const timer = setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setStage('success')
      setLoading(false)
    }, randomTime)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          `
        }}
      />

      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="initial-loading" stage="initial" progress={progress} />}

        {stage === 'success' && !quizAnswers && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex flex-col items-center justify-center px-4 py-8"
          >
            <div className="text-center max-w-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 150 }}
                className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              >
                <Check className="w-16 h-16 text-white" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl font-bold text-gray-800 mb-2"
              >
                Parabéns!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl text-gray-600 mb-8"
              >
                Compra realizada com sucesso
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStage('quiz')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-12 rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg mb-4"
              >
                Continuar
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === 'quiz' && !quizAnswers && (
          <QuizScreen
            key="quiz"
            onComplete={(answers) => {
              setQuizAnswers(answers)
              setStage('upsell')
            }}
          />
        )}

        {stage === 'upsell' && quizAnswers && (
          <UpsellScreen
            key="upsell"
            quizAnswers={quizAnswers}
            onAccept={() => {
              setUpsellAccepted(true)
              setStage('final')
            }}
            onReject={() => {
              setUpsellAccepted(false)
              setStage('final')
            }}
          />
        )}

        {stage === 'final' && (
          <FinalScreen key="final" accepted={upsellAccepted} quizAnswers={quizAnswers} />
        )}
      </AnimatePresence>
    </>
  )
}
