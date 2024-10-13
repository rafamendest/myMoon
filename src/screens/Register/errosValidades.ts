

interface errosValidadesProps {
  firstName: string;
  secondName: string;
  cpf: string;
  date: Date | null;
  isValidCPF: boolean;
}

export const errosValidades = ({isValidCPF, cpf, date, firstName, secondName}: errosValidadesProps) => {
  if (!isValidCPF) {
    return {
        noErrors: false,
        message: 'CPF inválido',
    };
  }

  if (cpf.length === 0) {
    return {
        noErrors: false,
        message: 'É necessário inserir um CPF!',
    };
  }

  if (date === null) {
    return {
        noErrors: false,
        message: 'É necessário inserir uma data!',
    };
  }

  if (firstName.length === 0) {
    return {
        noErrors: false,
        message: 'É necessário inserir o primeiro nome!',
    };
  }

  if (secondName.length === 0) {
    return {
        noErrors: false,
        message: 'É necessário inserir um sobrenome!',
    };
  }

  return {
    noErrors: true,
    message: '',
  };
};
