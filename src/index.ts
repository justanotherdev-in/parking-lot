import fs from 'fs';
import { join } from 'path';
import readLine from 'readline';
import ParkingLotController from './controller/parking-lot-controller';
import CommandController from './controller/command-controller';

function readCommand() {
    const rl = readLine.createInterface({
        input: fs.createReadStream(join(process.cwd(), 'command.txt'))
    })
    const parkingLotController = new ParkingLotController();
    const commandController = new CommandController(parkingLotController);
    rl.on('line', (data) => {
        const [command, ...args] = data.split(' ');
        if (command === 'exit') {
            console.log('Exiting!!');
            return rl.close();
        }
        let resp = '';
        try {
            resp = commandController.executeCommand(command, ...args);
        } catch (e) {
            resp = 'Unknow Error';
            if (e instanceof Error) {
                resp = e.message
            }
        } finally {
            console.log('RESPONSE>>', resp);
        }
        
    });
}

readCommand();