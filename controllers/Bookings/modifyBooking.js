import { Booking } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const modifyBooking = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const booking = await Booking.findOneAndReplace({ _id: id }, req.body);

  if (!booking) {
    return next(new errorHandler(`A booking with ID: ${id}, not found`, 404));
  }

  const modifiedBooking = await Booking.findById(id);
  res.status(200).json({
    messsage: `A booking with ID: ${id}, modified successfully to;`,
    modifiedBooking,
  });
});
