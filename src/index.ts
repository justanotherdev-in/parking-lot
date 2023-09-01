import fs from 'fs';
import { join } from 'path';
import readLine from 'readline';
import ParkingLotController from './parking-lot-controller';

function readCommand() {
    const rl = readLine.createInterface({
        input: fs.createReadStream(join(process.cwd(), 'command.txt'))
    })
    const parkingLotController = new ParkingLotController();
    rl.on('line', (data) => {
        const [command, ...args] = data.split(' ');
        if (command === 'exit') {
            console.log('Exiting!!');
            return rl.close();
        }
        
        parkingLotController.executeCommand(command, ...args);
    });
}

readCommand();