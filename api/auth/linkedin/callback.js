export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error) {
    console.error("Erro retornado pelo LinkedIn:", error);
    return res.status(400).json({ message: "Erro do LinkedIn", error });
  }

  if (!code) {
    console.error("Código de autorização não fornecido");
    return res.status(400).json({ message: "Código ausente na query string" });
  }

  console.log("Código de autorização recebido:", code);

  // Apenas resposta de teste para confirmar que está tudo fluindo
  return res.status(200).json({ message: "Callback recebido!", code });
}
