import express from "express";

const bookingsRouter = express.Router();

import {
  bookTour,
  getBookings,
  deleteBooking,
  updateBooking,
  getBooking,
  modifyBooking,
  getCheckOutSession,
} from "../controllers/Bookings";
import { admin, paginatedResults, verifyToken } from "../middleware";
import { Booking } from "../models";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     bookings:
 *       type: object
 *       required:
 *         - tourID
 *         - userID
 *         - NumberOfTicket
 *         - isPlayed
 *         - paymentMethod
 *       properties:
 *         tourID:
 *           type: string
 *           description: The ID of the tour associated with the booking
 *         userID:
 *           type: string
 *           description: The ID of the user making the booking
 *         NumberOfTicket:
 *           type: string
 *           description: The total ticket booked for a given tour
 *         isPlayed:
 *           type: boolean
 *           description: Indicates whether the tour has been played
 *         paymentMethod:
 *           type: string
 *           description: The payment method used for the booking
 *       example:
 *         tourID: "12345"
 *         userID: "67890"
 *         NumberOfTicket: "5"
 *         isPlayed: false
 *         paymentMethod: "Credit Card"
 */

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: The booking managing API
 */

/**
 * @swagger
 * /holidays/bookings/getbooking/{id}:
 *   get:
 *     summary: Get the data of the booked ticket by id
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The booking ticket id
 *     responses:
 *       200:
 *          description: The booking data found by id
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/bookings'
 *       204:
 *          description: No any type of booking data in the database
 *       404:
 *          description: The type of such booking was not found
 *       500:
 *          description: Internal Server Error
 */

bookingsRouter.get("/getbooking/:id", verifyToken, admin, getBooking);

/**
 * @swagger
 * /holidays/bookings/getbookings:
 *   get:
 *     summary: Returns the list of all the booking made
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: The list of the bookings found successfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/bookings'
 *       204:
 *          description: No any booking in the database
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

bookingsRouter.get(
  "/getbookings",
  verifyToken,
  admin,
  paginatedResults(Booking),
  getBookings
);

/**
 * @swagger
 * /holidays/bookings/booktour:
 *   post:
 *     summary: Book a ticket of a given future tour
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/bookings'
 *     responses:
 *       201:
 *          description: The ticket for a future tour was successfully booked
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/bookings'
 *       500:
 *          description: Internal Server Error
 */

bookingsRouter.post("/booktour", verifyToken, bookTour);

/**
 * @swagger
 * /holidays/bookings/deletebooking/{id}:
 *   delete:
 *     summary: Delete the booked data by id
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The booked data id
 *     responses:
 *       200:
 *          description: The current booked data was deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/bookings'
 *       204:
 *          description: No any booking data in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The booking data was not found
 *       500:
 *          description: Internal Server Error
 */

bookingsRouter.delete("/deletebooking/:id", verifyToken, deleteBooking);

/**
 * @swagger
 * /holidays/bookings/updatebooking/{id}:
 *   put:
 *     summary: Update the booking data by id
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/bookings'
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The booking data id
 *     responses:
 *       200:
 *          description: The current booking data was updated successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/bookings'
 *       204:
 *          description: No any type of booking data in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The booking data was not found
 *       500:
 *          description: Internal Server Error
 */

bookingsRouter.put("/updatebooking/:id", verifyToken, updateBooking);

/**
 * @swagger
 * /holidays/bookings/modifybooking/{id}:
 *   patch:
 *     summary: Modify the structure of the type of a booked data by id
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/bookings'
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The booking data id
 *     responses:
 *       200:
 *          description: The type of a booking data was modified successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/bookings'
 *       204:
 *          description: No any type of booking data in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The booking data was not found
 *       500:
 *          description: Internal Server Error
 */

bookingsRouter.patch("/modifybooking/:id", verifyToken, admin, modifyBooking);

bookingsRouter.get("/checkout/:id", verifyToken, admin, getCheckOutSession);

export default bookingsRouter;
