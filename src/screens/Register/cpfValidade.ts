export const cpfValidade = (cpf: string) => {
    
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]+/g, '');
      
        // Verifica se o CPF tem 11 dígitos ou é uma sequência repetida
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
          return false;
        }
      
        // Função para calcular o dígito verificador
        const calcularDigito = (base: any) => {
          let soma = 0;
          for (let i = 0; i < base.length; i++) {
            soma += base[i] * (base.length + 1 - i);
          }
          const resto = soma % 11;
          return resto < 2 ? 0 : 11 - resto;
        };
      
        // Extrai os primeiros 9 dígitos do CPF
        const baseCPF = cpf.substring(0, 9);
      
        // Calcula o primeiro e o segundo dígito verificador
        const primeiroDigito = calcularDigito(baseCPF);
        const segundoDigito = calcularDigito(baseCPF + primeiroDigito);
      
        // Verifica se os dígitos verificadores são válidos
        return cpf === baseCPF + primeiroDigito + segundoDigito;
}