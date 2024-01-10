import ExpressRateLimit from "express-rate-limit";

export const limiter = ExpressRateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 20,
  message:
    "Muitas requisições a partir deste IP, tente novamente em um minuto.",
});
