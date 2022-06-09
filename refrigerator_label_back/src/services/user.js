const db = require('../models/index.js');



is_user = async (body) => {
    const is_user = await db.Users.findOne({
        where: {
            cardId:body.cardId,
        }
    })
    return is_user;
}

card_id_find_mail = async (body)=> {
    const request = await db.Users.findOne({
        attributes: ['mail'],
        where: { cardId:body },
    })

    return request;
}

create_user = async (body) => {
    const user = await db.Users.create({
        cardId:body.cardId,
        name:body.name,
        mail:body.mail,
        phone:body.phone,
    })
    return user;
}

select_user_all = async () => {
    const request = await db.Users.findAll()
    return request;

}


module.exports = {
    select_user_all,
    create_user,
    is_user,
    card_id_find_mail
}