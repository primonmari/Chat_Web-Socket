const net = require('net')
const readline = require('readline')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})
const handleConnection = socket => {
	console.log("alguem conectou")
	socket.on('data', data => {
		const str = data.toString()
		if (str === 'end'){
			socket.end()
		}
		console.log('cliente: ' + str)
	})
	rl.addListener('line', line => {
		socket.write('server: ' + line)
	})
	socket.on('end', () =>{
		console.log("desconectou")
	})
}
const server = net.createServer(handleConnection)
server.li