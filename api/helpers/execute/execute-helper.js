export const execute = (func, params) => {
  try {
    func(...params);
  }
  catch (e) {
    res.status(500).send({ error: e.message });
  }
}