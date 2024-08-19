interface IStudent {
  id: number;
  name: string;
  email: string;
  ra: string;
  cpf: string;
}

interface ICreateStudent extends Omit<IStudent, 'id'> {
  //
}

interface IUpdateStudent extends Omit<IStudent, ['id', 'ra', 'cpf']> {
  //
}

export { IStudent, ICreateStudent, IUpdateStudent }
