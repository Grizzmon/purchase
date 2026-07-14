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
  const [particles, setParticles] = useState<Array<{ left: number; top: number }>>([])
  const messages = LOADING_MESSAGES[stage as keyof typeof LOADING_MESSAGES] || LOADING_MESSAGES.initial

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [messages.length])

  useEffect(() => {
    // Gera partículas apenas no cliente para evitar hydration mismatch
    setParticles([...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100
    })))
  }, [])

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
        {particles.map((particle, i) => (
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
              left: `${particle.left}%`,
              top: `${particle.top}%`
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
      window.fbq("track", "Purchase", { value: 0, currency: "MZN" })
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
        </div>
      </motion.div>
    )
  }

  // TELA QUANDO REJEITA O UPSELL - COM BOTÃO WHATSAPP
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-600 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
    >
      {/* Efeito de partículas */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-40"
          animate={{
            y: [0, -300],
            opacity: [0.4, 0]
          }}
          transition={{
            duration: 4 + i * 0.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      <div className="relative z-10 text-center max-w-md">
        {/* Ícone de sucesso */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
        >
          <Check className="w-10 h-10 text-blue-600" />
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-white mb-6 drop-shadow-lg"
        >
          Muito Obrigado!
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-white/90 mb-8 drop-shadow-lg"
        >
          Sua compra foi realizada com sucesso! Clique abaixo para concluir a ativação da sua conta.
        </motion.p>

        {/* Container do botão e informação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full space-y-6"
        >
          {/* BOTÃO DO WHATSAPP */}
          <motion.a
            href="https://wa.me/258857936697?text=Ola!%20ja%20realizei%20o%20pagamento%20e%20desejo%20ativar%20agora%20minha%20conta!"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(34, 197, 94, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white font-bold py-6 px-8 rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-3 relative overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
              animate={{ x: [-400, 400] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />
            <span className="relative text-2xl">💬</span>
            <span className="relative text-lg font-bold">Concluir Ativação no WhatsApp</span>
          </motion.a>

          {/* Caixa de informação */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/30 text-center"
          >
            <p className="text-white/80 text-sm leading-relaxed">
              Clique no botão acima para confirmar sua ativação via WhatsApp. Nosso suporte entrará em contato para finalizar o processo.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Componente Principal
export default function Home() {
  const [stage, setStage] = useState<'loading' | 'success' | 'quiz' | 'upsell' | 'final'>('loading')
  const [accepted, setAccepted] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    // Script Meta Pixel
    const script = document.createElement('script')
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '829061486173119'); 
      fbq('track', 'PageView');
    `
    document.head.appendChild(script)

    // Loading inicial
    const timer = setTimeout(() => {
      setInitialLoading(false)
      setStage('success')
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (initialLoading) {
    return <LoadingScreen stage="initial" progress={50} />
  }

  if (stage === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-500 to-green-600 flex flex-col items-center justify-center px-4 py-8"
      >
        <div className="text-center max-w-md">
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
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Parabéns!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/90 mb-8"
          >
            Seu pagamento foi confirmado com sucesso!
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setStage('quiz')}
            className="w-full bg-white text-green-600 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Continuar
          </motion.button>
        </div>
      </motion.div>
    )
  }

  if (stage === 'quiz') {
    return (
      <QuizScreen
        onComplete={(answers) => {
          setQuizAnswers(answers)
          setStage('upsell')
        }}
      />
    )
  }

  if (stage === 'upsell') {
    return (
      <UpsellScreen
        quizAnswers={quizAnswers}
        onAccept={() => {
          setAccepted(true)
          setStage('final')
        }}
        onReject={() => {
          setAccepted(false)
          setStage('final')
        }}
      />
    )
  }

  return <FinalScreen accepted={accepted} quizAnswers={quizAnswers} />
}
