const Comentario = {
  livro(parent, args, ctx, info) {
    return ctx.db.livros.find((livro) => {
      return livro.id === parent.livro;
    })
  },
  autor(parent, args, ctx, info) {
    return ctx.db.pessoas.find((pessoa) => {
      return pessoa.id === parent.autor;
    });
  }
}

export default Comentario;