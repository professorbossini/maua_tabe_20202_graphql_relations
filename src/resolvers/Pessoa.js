const Pessoa = {
  livros(parent, args, ctx, info) {
    return ctx.db.livros.filter((livro) => {
      return livro.autor === parent.id
    });
  },
  comentarios(parent, args, ctx, info) {
    return ctx.db.comentarios.filter((comentario) => {
      return comentario.autor === parent.id;
    })
  }
}

export default Pessoa;