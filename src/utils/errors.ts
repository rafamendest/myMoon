export const errorsAuth = (code : string) => {
    console.log(code);
    if (code === 'auth/invalid-email') {
        return 'Email inválido';
    } 

    if (code === 'auth/invalid-credential') {
        return 'Senha errada';
    } 

    if (code === 'auth/missing-password') {
        return 'É necessário uma senha';
    } 

    if (code === 'auth/weak-password') {
        return 'Senha fraca, é necessário conter mais de 6 dígitos';
    } 

    return 'Ocorreu um erro';
}