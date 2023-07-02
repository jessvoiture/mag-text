export const load = ({ fetch }) => {
  const fetchText = async () => {
    const res = await fetch('https://raw.githubusercontent.com/jessvoiture/mag-text/main/mag_text.json')
    const data = await res.json()

    return data
  }

  return {
    magazines: fetchText()
  }
}