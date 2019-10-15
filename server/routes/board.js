const boardController = require("./../controllers/board.ctrl");
const multipart = require("connect-multiparty");
const multipartWare = multipart();
module.exports = router => {
  /**
   * get user boards
   */
  router.route("/boards").get(boardController.getUserBoards);
  /**
   * add a board
   */
  router.route("/board").post(multipartWare, boardController.createBoard);

  /**
   * delete a board
   */
  router.route("/board").delete(multipartWare, boardController.deleteBoard);
};
