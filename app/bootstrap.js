import fs from 'fs';
import {Item} from 'app/model/item';
import {database} from 'app/model/database';
import {Trade} from 'app/model/trade';
import parse from 'csv-parse/lib/sync';

export async function bootstrap() {
    await database.sync();

    const amount = await Item.count();
    console.log(`Found ${amount} items`);
    if (!amount) {
        console.log('Importing Items into database');
        const file = fs.readFileSync('./items_de.csv', {encoding: 'utf8'});
        const records = parse(file, {from: 2});
        const items = records.map(record => ({id: parseInt(record[0], 10), name: record[10]})).filter(item => item.name);
        for (let i = 0; i < records.length; i += 50) {
            const chunk = items.slice(i, i + 50);
            await Item.bulkCreate(chunk)
                .then(() => console.log(`Created ${i + 50} items`))
                .catch(e => console.error('Could not create' + e))
        }
        // const items = file.split('\n').slice(1).map(line => {
        //     const ensuredQuotes = line.replace(/["']?,["']?/g, '","').replace(/^([^"])|([^"])$/g, '$2"$1');
        //     const splitted = ensuredQuotes.split('","');
        //     if (splitted[10]) {
        //         return {id: splitted[0].replace(/"/g, ''), name: splitted[10]};   
        //     }
        // }).filter(item => !!item);

        // const promises = items.map(item => 
        //     Item.create(item)
        //         .then(() => console.log(`Created ${item.id}`))
        //         .catch(e => console.error(`Can not create ${item.id} because ${e}`))
        // );
        
        // await Promise.all(promises);

        const created = await Item.count();
        console.log(`Created ${created} items`);
    } else {
        console.log(`Found ${amount} items`);
    }

    
    // const file = fs.readFileSync('./items.csv', {encoding: 'utf8'});
    // file.split('\n').map(async line => {
    //     const [action, created, itemName, quantity, price, hq] = line.split(';');
    //     const item = await Item.findOne({where: {name: itemName}});
    
    //     if (!item) {
    //         debugger;
    //     }

    //     await Trade.create({action, createdAt: new Date(created), quantity, price, totalPrice: quantity * price, hq, itemId: item.id});
    // });
}

