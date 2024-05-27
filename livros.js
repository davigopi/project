let livros = [];

function listarLivros() {
  console.log("Lista de Livros:");
  livros.forEach(livro => {
    console.log(`Título: ${livro.titulo}, Autor: ${livro.autor}, Gênero: ${livro.genero}, Ano: ${livro.ano}, Avaliação: ${livro.avaliacao}`);
  });
}

function adicionarLivro(titulo, autor, genero, ano, avaliacao) {
  livros.push({ titulo, autor, genero, ano, avaliacao });
  salvarDados();
  exibirLivros();
  console.log("Livro adicionado com sucesso!");
}

document.getElementById("formLivro").addEventListener("submit", function(event) {
  event.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const genero = document.getElementById("genero").value;
  const ano = parseInt(document.getElementById("ano").value);
  const avaliacao = parseFloat(document.getElementById("avaliacao").value);
  adicionarLivro(titulo, autor, genero, ano, avaliacao);
  document.getElementById("formLivro").reset();
});

function buscarLivro() {
  const termo = document.getElementById("busca").value.toLowerCase();
  const resultado = livros.filter(livro => {
    return livro.titulo.toLowerCase().includes(termo) ||
           livro.autor.toLowerCase().includes(termo) ||
           livro.genero.toLowerCase().includes(termo);
  });

  const listaLivros = document.getElementById("listaLivros");
  listaLivros.innerHTML = "";
  resultado.forEach(livro => {
    const li = document.createElement("li");
    li.textContent = `Título: ${livro.titulo}, Autor: ${livro.autor}, Gênero: ${livro.genero}, Ano: ${livro.ano}, Avaliação: ${livro.avaliacao}`;
    listaLivros.appendChild(li);
  });
}

function classificarLivros(criterio) {
  livros.sort((a, b) => {
    if (a[criterio] < b[criterio]) return -1;
    if (a[criterio] > b[criterio]) return 1;
    return 0;
  });
  exibirLivros();
}

function avaliarLivro(titulo, avaliacao) {
  const livro = livros.find(livro => livro.titulo === titulo);
  if (livro) {
    livro.avaliacao = avaliacao;
    console.log(`Avaliação do livro "${titulo}" atualizada para ${avaliacao}.`);
  } else {
    console.log(`Livro "${titulo}" não encontrado.`);
  }
}

function salvarDados() {
  localStorage.setItem('livros', JSON.stringify(livros));
  console.log("Dados salvos com sucesso!");
}

function carregarDados() {
  const data = localStorage.getItem('livros');
  if (data) {
    livros = JSON.parse(data);
    console.log("Dados carregados com sucesso!");
  } else {
    console.log("Não há dados salvos.");
  }
}

function excluirLivros() {
    localStorage.removeItem('livros');
    livros = [];
    exibirLivros();
    console.log("Dados limpos com sucesso!");
}
 
function adicionarLivros() {
    adicionarLivro("Código Limpo", "Robert C. Martin", "Programação", 2008, 4.8);
    adicionarLivro("O Programador Pragmático", "Andrew Hunt, David Thomas", "Programação", 1999, 4.7);
    adicionarLivro("Estruturas de Dados e Algoritmos com JavaScript", "Michael McMillan", "Programação", 2014, 4.5);
    adicionarLivro("Design Patterns: Elements of Reusable Object-Oriented Software", "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides", "Engenharia de Software", 1994, 4.6);
    adicionarLivro("Introdução aos Algoritmos", "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein", "Ciência da Computação", 2009, 4.7);
    adicionarLivro("JavaScript: The Good Parts", "Douglas Crockford", "Programação", 2008, 4.3);
    adicionarLivro("Clean Architecture", "Robert C. Martin", "Arquitetura de Software", 2017, 4.5);
    adicionarLivro("Refatoração: Aperfeiçoando o Design de Códigos Existentes", "Martin Fowler", "Programação", 1999, 4.6);
    adicionarLivro("Código Completo", "Steve McConnell", "Engenharia de Software", 2004, 4.7);
    adicionarLivro("Padrões de Projeto com JavaScript", "Addy Osmani", "Programação", 2012, 4.2);
    adicionarLivro("Artificial Intelligence: A Modern Approach", "Stuart Russell, Peter Norvig", "Inteligência Artificial", 2009, 4.5);
    adicionarLivro("Deep Learning", "Ian Goodfellow, Yoshua Bengio, Aaron Courville", "Inteligência Artificial", 2016, 4.8);
    adicionarLivro("Pattern Recognition and Machine Learning", "Christopher M. Bishop", "Inteligência Artificial", 2006, 4.6);
    adicionarLivro("Machine Learning Yearning", "Andrew Ng", "Inteligência Artificial", 2018, 4.7);
    adicionarLivro("Don't Make Me Think", "Steve Krug", "Web Design", 2000, 4.6);
    adicionarLivro("HTML and CSS: Design and Build Websites", "Jon Duckett", "Web Design", 2011, 4.5);
    adicionarLivro("JavaScript and JQuery: Interactive Front-End Web Development", "Jon Duckett", "Web Design", 2014, 4.6);
    adicionarLivro("Responsive Web Design with HTML5 and CSS3", "Ben Frain", "Web Design", 2012, 4.4);
    adicionarLivro("The Pragmatic Programmer", "Andrew Hunt, David Thomas", "Programação", 1999, 4.7);
    adicionarLivro("The Mythical Man-Month", "Frederick P. Brooks Jr.", "Engenharia de Software", 1975, 4.5);
    adicionarLivro("The Art of Computer Programming", "Donald E. Knuth", "Ciência da Computação", 1968, 4.9);
    adicionarLivro("Introduction to the Theory of Computation", "Michael Sipser", "Teoria da Computação", 1996, 4.6);
    adicionarLivro("Computer Networks", "Andrew S. Tanenbaum, David J. Wetherall", "Redes de Computadores", 2010, 4.7);

}

function exibirLivros() {
  const listaLivros = document.getElementById("listaLivros");
  listaLivros.innerHTML = "";
  livros.forEach(livro => {
    const li = document.createElement("li");
    li.textContent = `Título: ${livro.titulo}, Autor: ${livro.autor}, Gênero: ${livro.genero}, Ano: ${livro.ano}, Avaliação: ${livro.avaliacao}`;
    listaLivros.appendChild(li);
  });
}

carregarDados();
exibirLivros();




// listarLivros();
// buscarLivro("Harry Potter");
// classificarLivros("titulo");
// avaliarLivro("Dom Casmurro", 4.7);
// salvarDados();
