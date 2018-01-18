class DefaultHandler {
  constructor(){}
  execute(){}
  getRequestHandler(){
    return this.execute.bind(this.getRequestHandler);
  }
}
module.exports = DefaultHandler;