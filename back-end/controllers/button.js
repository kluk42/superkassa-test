const Button = require('../models/button');
const WrongRequestErr = require('../errors/wrong-request-err');

const updateButtonState = async (req, res, next) => {
  console.log(req)
  try {
    if ((req.body.state !== 'on') && (req.body.state !== 'off')) {
      throw new WrongRequestErr('У кнопки может быть только два состояния: on или off');
    }
    const receivedState = req.body.state;
    const currentButton = await Button.findOne({ name: 'button' });
    let newButton;
    if (receivedState !== currentButton.state) {
      newButton = await Button.findOneAndUpdate({ name: 'button' }, { state: receivedState }, { new: true });
    }
    let stateToSend;
    if (newButton) {
      stateToSend = newButton.state;
    } else {
      stateToSend = currentButton.state;
    }
    return res.status(200).send({ state: stateToSend });
  } catch (err) {
    return next(err);
  }
};

const getButtonState = async (req, res, next) => {
  try {
    const currentButton = await Button.findOne({ name: 'button' });
    res.status(200).send({ state: currentButton.state });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateButtonState,
  getButtonState,
};
