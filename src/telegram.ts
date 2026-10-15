export async function enviarATelegram(texto: string) {
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

  if (!chatId) {
    return false
  }

  const res = await fetch('/telegram', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: texto }),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`No se pudo enviar a Telegram: ${errorText}`)
  }

  return true
}