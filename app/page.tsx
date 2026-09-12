'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Smartphone, Wifi, Zap, AlertTriangle, X, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'

declare global {
  interface Window {
    fbq?: (action: string, event: string, data?: object) => void
  }
}

// Configurações Globais
const WHATSAPP_LINK = "https://wa.me/258842118909?text=Ja%20fiz%20a%20pre%20ativa%C3%A7ao%20quero%20finalizar%20a%20ativa%C3%A7o"
const TUTORA_PAY_LINK = "https://pay.tutora.co.mz/e6cc1edc66244aa7b142f8049459b73b"
const VIP_ACCESS_LINK = "https://seubancodigital.vercel.app/vip"
const PRODUCT_VALUE_MZN = 429
const PURCHASE_ID_STORAGE_KEY = "vip_purchase_id"

// Mensagens dinâmicas de carregamento
const LOADING_MESSAGES = {
  initial: ['Conectando ao servidor seguro...', 'Validando pagamento...', 'Processando dados da transação...', 'Sincronizando conta VIP...'],
  quiz: ['Analisando respostas...', 'Configurando perfil do dispositivo...', 'Gerando credenciais exclusivas...', 'Otimizando sistema...'],
  upsell: ['Calculando benefícios da conta...', 'Preparando oferta de ativação...', 'Gerando chave de segurança...', 'Ativando recursos VIP...'],
  final: ['Enviando confirmação por e-mail...', 'Liberando acesso VIP...', 'Gerando credenciais...', 'Finalizando registro...']
}

// Componente LoadingScreen Azul
const LoadingScreen = ({ stage = 'initial', progress = 0 }: { stage?: string; progress?: number }) => {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [particles, setParticles] = useState<Array<{ left: number; top: number }>>([])
  const messages = LOADING_MESSAGES[stage as keyof typeof LOADING_MESSAGES] || LOADING_MESSAGES.initial

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length)
    }, 1400)
    return () => clearInterval(interval)
  }, [messages.length])

  useEffect(() => {
    setParticles([...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100
    })))
  }, [])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <Image
          src="/hero-woman.png"
          alt="Loading Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-indigo-950/70 to-slate-950/90 backdrop-blur-sm"></div>
      </div>

      {/* Partículas flutuantes */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"
            animate={{
              y: [0, -200, -400],
              opacity: [0, 1, 0],
              x: Math.sin(i) * 80
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

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Spinner central iluminado */}
        <motion.div
          className="relative w-40 h-40 mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="none" stroke="url(#blueGrad)" strokeWidth="2" opacity="0.2" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#blueGrad)"
              strokeWidth="3"
              strokeDasharray="283"
              strokeDashoffset="283"
              animate={{ strokeDashoffset: [283, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>

          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl"
            style={{
              boxShadow: '0 0 50px rgba(59, 130, 246, 0.7), inset 0 0 30px rgba(255, 255, 255, 0.2)'
            }}
            animate={{
              scale: [0.95, 1.05, 0.95],
              boxShadow: [
                '0 0 30px rgba(59, 130, 246, 0.5)',
                '0 0 60px rgba(6, 182, 212, 0.9)',
                '0 0 30px rgba(59, 130, 246, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="text-white w-14 h-14 drop-shadow-md" />
          </motion.div>
        </motion.div>

        {/* Barra de Progresso */}
        <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mb-8 border border-blue-500/30">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.8)'
            }}
          />
        </div>

        {/* Mensagem Dinâmica */}
        <motion.div
          className="text-center"
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">
            {messages[currentMessage]}
          </h2>
          <p className="text-blue-200/70 text-sm">Por favor, aguarde alguns segundos...</p>
        </motion.div>
      </div>
    </div>
  )
}

// Componente Quiz / Pré-cadastro do Lead
const QuizScreen = ({ onComplete }: { onComplete: (answers: any) => void }) => {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState({ device: '', internet: '' })

  const handleAnswerDevice = (device: string) => {
    setLoading(true)
    setTimeout(() => {
      setAnswers(prev => ({ ...prev, device }))
      setStep(1)
      setLoading(false)
    }, 2500)
  }

  const handleAnswerInternet = (internet: string) => {
    setLoading(true)
    setTimeout(() => {
      const updatedAnswers = { ...answers, internet }
      setAnswers(updatedAnswers)
      onComplete(updatedAnswers)
    }, 2500)
  }

  if (loading) {
    return <LoadingScreen stage="quiz" progress={step === 0 ? 35 : 70} />
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex flex-col items-center justify-center px-4 py-8"
      >
        <div className="w-full max-w-md">
          {/* Indicador de Passos */}
          <div className="mb-8">
            <div className="flex gap-2 mb-3">
              <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step === 0 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-blue-900/50'}`} />
              <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step === 1 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-blue-900/50'}`} />
            </div>
            <p className="text-xs text-blue-300 uppercase tracking-widest font-semibold">Configuração do Perfil • Etapa {step + 1} de 2</p>
          </div>

          {step === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Qual dispositivo você utilizará para acessar o aplicativo?</h2>
              <p className="text-blue-200/70 text-sm mb-6">Sua resposta otimizará o desempenho no seu smartphone.</p>
              
              <motion.button
                whileHover={{ scale: 1.02, borderColor: '#3b82f6' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerDevice('Android')}
                className="w-full p-5 bg-slate-900/80 border border-blue-500/30 rounded-2xl text-left hover:bg-blue-900/30 transition-all shadow-lg backdrop-blur-md"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">Android</p>
                    <p className="text-sm text-blue-200/60">Dispositivo Samsung, Xiaomi, Motorola, etc.</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, borderColor: '#3b82f6' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerDevice('iPhone')}
                className="w-full p-5 bg-slate-900/80 border border-blue-500/30 rounded-2xl text-left hover:bg-blue-900/30 transition-all shadow-lg backdrop-blur-md"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">iPhone (iOS)</p>
                    <p className="text-sm text-blue-200/60">Dispositivo Apple iPhone</p>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Qual a estabilidade da sua conexão com a internet?</h2>
              <p className="text-blue-200/70 text-sm mb-6">Ajustaremos a taxa de transmissão de dados do sistema.</p>

              <motion.button
                whileHover={{ scale: 1.02, borderColor: '#3b82f6' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerInternet('Sim')}
                className="w-full p-5 bg-slate-900/80 border border-blue-500/30 rounded-2xl text-left hover:bg-blue-900/30 transition-all shadow-lg backdrop-blur-md"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400">
                    <Wifi className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">Internet Sempre Disponível</p>
                    <p className="text-sm text-blue-200/60">Uso Wi-Fi ou Dados Móveis frequentes</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, borderColor: '#3b82f6' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerInternet('Limitada')}
                className="w-full p-5 bg-slate-900/80 border border-blue-500/30 rounded-2xl text-left hover:bg-blue-900/30 transition-all shadow-lg backdrop-blur-md"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
                    <Wifi className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">Conexão Limitada</p>
                    <p className="text-sm text-blue-200/60">Acesso ocasional ou instável</p>
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

// Componente Upsell com Oferta VIP e Modal
const UpsellScreen = ({ onAccept, onReject }: { quizAnswers: any; onAccept: () => void; onReject: () => void }) => {
  const [loading, setLoading] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)

  const handleIgnoreClick = () => {
    setShowAlertModal(true)
  }

  const handleForceIgnore = () => {
    setLoading(true)
    setShowAlertModal(false)
    setTimeout(() => {
      onReject()
    }, 2000)
  }

  if (loading) {
    return <LoadingScreen stage="upsell" progress={85} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex flex-col items-center justify-center px-4 py-8 relative"
    >
      <div className="w-full max-w-xl">
        {/* Cabe��alho */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-3">
            Oportunidade Exclusiva
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Ative o Modo App Seguro VIP!</h1>
          <p className="text-blue-200/80 text-base">Garante ultra velocidade, estabilidade total e proteção para a sua conta.</p>
        </motion.div>

        {/* Card do Upsell */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/90 rounded-3xl shadow-2xl p-6 md:p-8 mb-6 border border-blue-500/30 relative overflow-hidden backdrop-blur-xl"
        >
          <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full font-bold text-xs shadow-md">
            -60% OFF
          </div>

          <div className="mb-6">
            <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">Taxa Única de Ativação VIP:</p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-black text-cyan-400">399 MZN</span>
              <span className="text-xl text-slate-500 line-through font-medium">999 MZN</span>
            </div>
          </div>

          {/* Lista de Benefícios */}
          <div className="space-y-3 mb-8">
            {[
              'Acesso Prioritário e sem filas no servidor',
              'Proteção Anti-Bloqueio e Garantia Estendida',
              'Isenção total de taxas em transações futuras',
              'Suporte VIP via WhatsApp 24h por dia'
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">✓</div>
                <span className="text-slate-200 text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Botões de Ação */}
          <div className="space-y-3">
            <a
              href={TUTORA_PAY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-6 rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all block text-center text-base uppercase tracking-wider relative overflow-hidden"
            >
              ATIVAR MODO APP SEGURO VIP
            </a>

            <button
              onClick={handleIgnoreClick}
              className="w-full bg-slate-800/60 text-slate-400 hover:text-white font-semibold py-3 px-6 rounded-2xl hover:bg-slate-800 transition-all text-xs"
            >
              Continuar com a versão básica sem o Modo Seguro
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal de Aviso */}
      <AnimatePresence>
        {showAlertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-500/40 relative"
            >
              <button
                onClick={() => setShowAlertModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4 text-amber-400">
                <AlertTriangle className="w-8 h-8 flex-shrink-0 animate-bounce" />
                <h3 className="text-lg font-bold">Atenção Requerida</h3>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Sua conta pode apresentar lentidão ou instabilidade sem a chave de ativação VIP. Recomendamos concluir a ativação para evitar quedas no acesso.
              </p>

              <div className="space-y-3">
                <a
                  href={TUTORA_PAY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-lg block text-center text-sm uppercase tracking-wide"
                >
                  FINALIZAR ATIVAÇÃO AGORA
                </a>

                <button
                  onClick={handleForceIgnore}
                  className="w-full text-slate-400 hover:text-slate-200 text-xs py-2 transition-all underline"
                >
                  Prosseguir com o acesso básico mesmo assim
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Tela Final (Marca conclusão do fluxo e Redireciona para o Link do Banco Digital VIP)
const FinalScreen = ({ accepted }: { accepted: boolean }) => {
  useEffect(() => {
    // Purchase e e-mail já foram disparados na entrada; aqui só marcamos a conclusão do fluxo
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", "FlowCompleted", { upsell_accepted: accepted })
    }
  }, [accepted])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex flex-col items-center justify-center px-4 py-8 relative"
    >
      <div className="relative z-10 text-center max-w-md w-full">
        {/* Ícone de Sucesso Iluminado */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(6,182,212,0.6)]"
        >
          <Check className="w-10 h-10 text-slate-950 stroke-[3]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-extrabold text-white mb-3"
        >
          Pagamento Confirmado!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-blue-200/80 text-base mb-8"
        >
          Sua transação foi processada com sucesso. Seu e-mail de confirmação foi enviado e o seu acesso VIP já está liberado!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          {/* BOTÃO PRINCIPAL: REDIRECIONAMENTO PARA O LINK VIP */}
          <a
            href={VIP_ACCESS_LINK}
            className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-5 px-8 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-3 text-lg group"
          >
            <span>ACESSAR BANC ODIGITAL VIP</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* BOTÃO SECUNDÁRIO: ATENDIMENTO WHATSAPP */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-slate-900/80 border border-blue-500/30 text-blue-300 hover:text-white hover:bg-blue-900/40 font-semibold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 text-sm backdrop-blur-md"
          >
            <span>💬 Precisa de ajuda? Falar com Suporte no WhatsApp</span>
          </a>

          <div className="bg-slate-900/50 rounded-xl p-4 border border-blue-500/20 text-center mt-6">
            <p className="text-xs text-blue-300/60 leading-relaxed">
              Clique no botão acima para ser redirecionado imediatamente à sua conta VIP.
            </p>
          </div>
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
    // Cada visitante recebe um ID de compra persistente; se já existir, é uma revisita
    // e não disparamos Purchase nem e-mail de novo.
    let purchaseId = localStorage.getItem(PURCHASE_ID_STORAGE_KEY)
    const isFirstVisit = !purchaseId
    if (!purchaseId) {
      purchaseId = crypto.randomUUID()
      localStorage.setItem(PURCHASE_ID_STORAGE_KEY, purchaseId)
    }

    // Script do Meta Pixel. O eventID permite ao Meta deduplicar o Purchase.
    const purchaseTrack = isFirstVisit
      ? `fbq('track', 'Purchase', { value: ${PRODUCT_VALUE_MZN}, currency: 'MZN', content_name: 'Conta Digital VIP', content_type: 'product', num_items: 1 }, { eventID: '${purchaseId}' });`
      : ""
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
      ${purchaseTrack}
    `
    document.head.appendChild(script)

    // Quem chega nesta página já pagou: notifica a compra por e-mail apenas na primeira visita
    if (isFirstVisit) {
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchaseId }),
      }).catch((err) => console.error(err))
    }

    const timer = setTimeout(() => {
      setInitialLoading(false)
      setStage('success')
    }, 2200)

    return () => clearTimeout(timer)
  }, [])

  if (initialLoading) {
    return <LoadingScreen stage="initial" progress={50} />
  }

  // Tela Inicial de Notificação de Pagamento Feito com Sucesso
  if (stage === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex flex-col items-center justify-center px-4 py-8"
      >
        <div className="text-center max-w-md w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(59,130,246,0.6)]"
          >
            <ShieldCheck className="w-12 h-12 text-slate-950" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold text-white mb-3"
          >
            Pagamento Feito com Sucesso!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-blue-200/80 mb-8 text-base"
          >
            Confirmamos o recebimento da sua compra. Vamos responder 2 perguntas rápidas para personalizar seu acesso antes de entrar no aplicativo.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setStage('quiz')}
            className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-2 text-lg"
          >
            <span>Continuar Pré-Ativação</span>
            <ArrowRight className="w-5 h-5" />
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

  return <FinalScreen accepted={accepted} />
}
