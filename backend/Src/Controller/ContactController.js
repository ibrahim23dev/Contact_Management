const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const ContactModel = require('../../Src/Models/ContactModel');
const { resposeReturn } = require('../Utils/Response');

class ContactController {
    add_Contact = async (req, res) => {
        const { id } = req;
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return resposeReturn(res, 500, { error: err.message });
            }

            let { name, email, Phone_Number, Address } = fields;

            // Ensure fields are not arrays
            name = Array.isArray(name) ? name[0] : name;
            email = Array.isArray(email) ? email[0] : email;
            Phone_Number = Array.isArray(Phone_Number) ? Phone_Number[0] : Phone_Number;
            Address = Array.isArray(Address) ? Address[0] : Address;

            name = name.trim();
            email = email.trim();
            Phone_Number = Phone_Number.trim();
            Address = Address.trim();

            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            });

            try {
                let allImageUrl = [];

                for (let i = 0; i < files.image.length; i++) {
                    const result = await cloudinary.uploader.upload(files.image[i].path, { folder: 'Contact' });
                    allImageUrl.push(result.url);
                    console.log(result);
                }

                await ContactModel.create({
                    contactId: id,
                    name,
                    email,
                    Phone_Number,
                    Address,
                    image: allImageUrl,
                });

                resposeReturn(res, 201, { message: "Contact add success" });
            } catch (error) {
                resposeReturn(res, 500, { error: error.message });
            }
        });
    }


    contact_get = async (req, res) => {
        const { page, searchValue, parPage } = req.query;
        const { id } = req;
        const skipPage = parseInt(parPage) * (parseInt(page) - 1);

        try {
            if (searchValue) {
                const Contact = await ContactModel.find({
                    $text: { $search: searchValue },
                    contactId: id
                }).skip(skipPage).limit(parPage).sort({ createdAt: -1 });

                const totalContact = await ContactModel.find({
                    $text: { $search: searchValue },
                    contactId: id
                }).countDocuments();

                resposeReturn(res, 200, { totalContact, Contact });
            } else {
                const Contact = await ContactModel.find({ contactId: id }).skip(skipPage).limit(parPage).sort({ createdAt: -1 });
                const totalContact = await ContactModel.find({ contactId: id }).countDocuments();

                resposeReturn(res, 200, { totalContact, Contact });
            }
        } catch (error) {
            console.log(error.message);
            resposeReturn(res, 500, { error: error.message });
        }
    };
}

module.exports = new ContactController();
