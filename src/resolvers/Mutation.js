import { v4 as uuidv4 } from 'uuid';
const Mutation = {
  inserirPessoa(parent, args, ctx, info) {
    const pessoa = {
      id: uuidv4(),
      nome: args.pessoa.nome,
      idade: args.pessoa.idade
    };
    ctx.db.pessoas.push(pessoa);
    return pessoa;
  },
  removerPessoa(parent, args, ctx, info) {
    const indice = ctx.db.pessoas.findIndex((p) => p.id === args.id);
    if (indice < 0)
      throw new Error("Pessoa não existe");
    const removido = ctx.db.pessoas.splice(indice, 1)[0];
    ctx.db.livros = ctx.db.livros.filter((l) => {
      const remover = l.autor === args.id;
      if (remover) {
        ctx.db.comentarios = ctx.db.comentarios.filter(c => c.livro !== l.id);
      }
      return !remover;
    });
    return removido;

  },
  inserirLivro(parent, args, ctx, info) {
    const autorExiste = ctx.db.pessoas.some((pessoa) => {
      return pessoa.id === args.livro.autor
    });
    if (!autorExiste) {
      throw new Error("Autor não existe");
    }
    const livro = {
      id: uuidv4(),
      titulo: args.livro.titulo,
      edicao: args.livro.edicao,
      autor: args.livro.autor
    };
    ctx.db.livros.push(livro);
    return livro;
  },
  removerLivro(parent, args, ctx, info) {
    const indice = ctx.db.livros.findIndex((l) => l.id === args.id);
    if (indice < 0)
      throw new Error("Livro não existe")
    const removido = ctx.db.livros.splice(indice, 1)[0];
    ctx.db.comentarios = ctx.db.comentarios.filter(c => c.livro !== args.id);
    return removido;

  },
  inserirComentario(parent, args, ctx, info) {
    if (!ctx.db.pessoas.some((p) => p.id === args.comentario.autor) ||
      !ctx.db.livros.some((l) => l.id === args.comentario.livro)) {
      throw new Error("Autor e/ou Livro não existem")
    }
    const comentario = {
      id: uuidv4(),
      texto: args.comentario.texto,
      nota: args.comentario.nota,
      autor: args.comentario.autor,
      livro: args.comentario.livro
    };
    ctx.db.comentarios.push(comentario);
    return comentario;
  },
  removerComentario(parent, args, ctx, info) {
    const indice = ctx.db.comentarios.findIndex(c => c.id === args.id);
    if (indice < 0)
      throw new Error("Comentario não existe")
    return ctx.db.comentarios.splice(indice, 1)[0];
  }
}

export default Mutation;