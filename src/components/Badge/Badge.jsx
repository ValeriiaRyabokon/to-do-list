import React from 'react'
import classname from 'classname'
import './Badge.scss'
const Badge=({color, onClick, className})=><i onClick={onClick}  className={classname('badge',{[`badge_${color}`]:color}, className)}></i>
export default Badge;