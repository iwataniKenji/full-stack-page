import { Channel, connect } from "amqplib";

const QUEUE_NAME = "artist_queue";

export const sendMessageToRabbitMQ = async (message: string): Promise<void> => {
  try {
    // conectar ao rabbitMQ
    const connection = await connect("amqp://kenji:123456@localhost");
    const channel: Channel = await connection.createChannel();

    // declara uma fila
    await channel.assertQueue(QUEUE_NAME, { durable: false });

    // envia mensagem
    channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
    console.log(`Mensagem enviada: ${message}`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Erro ao enviar mensagem para o RabbitMQ:", error);
  }
};
