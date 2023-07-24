export function signup(req, res) {
  res.status(201).send({
    msg: "Signup successful...",
  });
}

export function getBill(req, res) {
  res.status(201).send({
    msg: "getBill successful...",
  });
}
