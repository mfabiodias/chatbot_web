/* importar as configurações do servidor */
const app = require('./config/server');

const port = process.env.PORT || 3000;

/* parametrizar a porta de escuta */
const server = app.listen(port, function(){
	console.log('Servidor online na porta '+port);
})

// const PORT = process.env.PORT || 3000;
// const INDEX = '/app.js';

// const server = app
// .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
// .listen(PORT, function(){
// 	console.log('Servidor online na porta '+PORT);
// })

const io = require('socket.io').listen(server);

app.set('io', io);

/* criar a conexão por websocket */
io.on('connection', function(socket){
	console.log('Usuário conectou');

	socket.on('disconnect', function(){
		console.log('Usuário desconectou');
	});

	socket.on('msgParaServidor', function(data){

		if(data.mensagem.toLowerCase() == 'ola')
		{
			socket.emit(
				'msgParaCliente', 
				{apelido: data.apelido, mensagem: data.mensagem}
			);

			socket.emit(
				'msgParaCliente', 
				{apelido: 'Robo', mensagem: 'Oi, tudo bem? Estou em desenvolvimento e em breve estarei pronto para te ajudar.'}
			);
		}
		else if(data.mensagem.toLowerCase() == 'pagar')
		{
			socket.emit(
				'msgParaCliente', 
				{apelido: data.apelido, mensagem: data.mensagem}
			);

			socket.emit(
				'msgParaCliente', 
				{apelido: 'Robo', mensagem: 'Espertinho! Deseja pagar porque estou em fase de teste e ainda não consigo gerar seu boleto ne!? kkkkkk'}
			);
		}
		else
		{
			socket.emit(
				'msgParaCliente', 
				{apelido: data.apelido, mensagem: data.mensagem}
			);

			socket.emit(
				'msgParaCliente', 
				{apelido: 'Robo', mensagem: 'Olá, sou o Robo do SemParar e ainda estou em fase de testes.<br>Digite alguma das mensagens abaixo para testar meu bot<br><br>1-) Ola<br>2-) Pagar'}
			);
		}

		// /* Mensagem enviada e impressa para mim mesmo */
		// socket.emit(
		// 	'msgParaCliente', 
		// 	{apelido: data.apelido, mensagem: data.mensagem}
		// );

		// /* Mensagem enviada e impressa para demais membros */
		// socket.broadcast.emit(
		// 	'msgParaCliente', 
		// 	{apelido: data.apelido, mensagem: data.mensagem}
		// );

		// /* participantes */
		// if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
		// 	socket.emit(
		// 		'participantesParaCliente', 
		// 		{apelido: data.apelido}
		// 	);

		// 	socket.broadcast.emit(
		// 		'participantesParaCliente', 
		// 		{apelido: data.apelido}
		// 	);
		// }
	});

});