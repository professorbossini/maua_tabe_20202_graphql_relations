const Livro = {
  autor(parent, args, ctx, info) {
    return ctx.db.pessoas.find((pessoa) => {
      return pessoa.id === parent.autor;
    });
  },
  comentarios(parent, args, ctx, info) {
    return ctx.db.comentarios.filter((comentario) => {
      return comentario.livro === parent.id;
    })
  }
};
export default Livro;