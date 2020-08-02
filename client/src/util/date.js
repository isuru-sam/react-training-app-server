import Moment from "moment";

export const formatDate = dateString => format =>{
    return dateString? new Moment(dateString).format(format||'YYYY/MM/DD'):'';
}

export const formatTime = timeString =>{
    return timeString ? new Moment(timeString, 'HH:mm:ss').format('HH:mm') : '';
}

export const formatDateTime = dateString =>{
    return dateString? new Moment(dateString).format('YYYY/MM/DD HH:mm'):'';
}

export const isConnectableAvatar = (startDateTime, endDateTime , avatarOutBeforeMinutes)=>{
    endDateTime.setMinutes(endDateTime.getMinutes() - avatarOutBeforeMinutes);
    const startUnixTime = Date.parse(startDateTime);
    const endUnixTime = Date.parse(endDateTime);
    const nowDate = new Date();
    const nowUnixTime = Date.parse(nowDate);
    return (startUnixTime < nowUnixTime && nowUnixTime <= endUnixTime);
}

export const getAvatarInRemainingTime = (scheduledEndTime, avatarOutBeforeMinutes) =>{
    scheduledEndTime.setMinutes(scheduledEndTime.getMinutes()-avatarOutBeforeMinutes);
    const now = new Date();
    const diffTime = scheduledEndTime.getTime() - now.getTime();
    return Math.floor(diffTime / (1000));
}

export const compareByDate = (baseDate, targetDate) =>{
    const date1 = new Moment(baseDate);
    const date2 = new Moment(targetDate);
    return date1.diff(date2, 'days');
}

export const isExpireBookingEndTime = (endDateTime) =>{
    const endUnixTime = Date.parse(endDateTime);
    const nowDate = new Date();
    const nowUnixTime = Date.parse(nowDate);

    return (nowUnixTime >= endUnixTime);
}