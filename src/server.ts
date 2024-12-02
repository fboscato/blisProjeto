import { app } from "./app";
import { env } from "./env";

const PORT = process.env.PORT || env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
