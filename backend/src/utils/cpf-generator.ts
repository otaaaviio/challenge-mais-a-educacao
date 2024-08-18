export function generateCPF(): string {
  const generateDigit = (base: string): number => {
    let sum = 0;
    let multiplier = base.length + 1;

    for (const digit of base) {
      sum += parseInt(digit) * multiplier--;
    }

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  let base = '';
  for (let i = 0; i < 9; i++) {
    base += Math.floor(Math.random() * 10).toString();
  }

  const digit1 = generateDigit(base);
  const digit2 = generateDigit(base + digit1);

  const cpf = `${base}${digit1}${digit2}`;
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
