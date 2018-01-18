class Time {
  constructor(){
    this.date = new Date();
  }
  getTime(){
    return this.date.toDateString();
  }
  getDate(){
    return this.date.toLocaleDateString();
  }
  getTimeStamp(){
    return `${this.getTime()} ${this.getDate()}`;
  }
}

module.exports = Time;