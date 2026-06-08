const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");
const Joi = require("joi");
const auth = require("../../models/auth.js");

router.use(auth);

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  favorite: Joi.boolean().optional(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts(req.user._id);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id, req.user._id);
  if (!contact) {
    return res.status(404).json({ message: "not found" });
  } else {
    res.status(200).json(contact);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newContact = await addContact({
      name,
      email,
      phone,
      favorite,
      owner: req.user._id,
    });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleteContact = await removeContact(req.params.id, req.user._id);
    if (deleteContact) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      return res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updatedContact = await updateContact(
      req.params.id,
      req.body,
      req.user._id,
    );
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const { error } = favoriteSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (typeof favorite === "undefined") {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const updatedContact = await updateStatusContact(
      contactId,
      favorite,
      req.user._id,
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
