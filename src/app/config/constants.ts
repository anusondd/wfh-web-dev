export const LOCAL_LANG_KEY = 'localLanguage';

export const VERIFY_OTP_TIMER = 15;

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;

export const HTTP_TIME_OUT = 10000; // millisecond

export const MSG_SAVE_SUCCESS = 'บันทึกสำเร็จ'; // millisecond
export const MSG_SAVE_FALSE = 'บันทึกไม่สำเร็จ'; // millisecond


export const IMG_DATA_TYPE = 'data:image/png;base64,';


export const MONTH_LIST = [
  { value: 0, name: 'มกราคม' },
  { value: 1, name: 'กุมภาพันธ์' },
  { value: 2, name: 'มีนาคม' },
  { value: 3, name: 'เมษายน' },
  { value: 4, name: 'พฤษภาคม' },
  { value: 5, name: 'มิถุนายน' },
  { value: 6, name: 'กรกฏาคม' },
  { value: 7, name: 'สิงหาคม' },
  { value: 8, name: 'กันยายน' },
  { value: 9, name: 'ตุลาคม' },
  { value: 10, name: 'พฤศจิกายน' },
  { value: 11, name: 'ธันวาคม' }
];

export const MONTH_LIST_SHORT = [
  { value: 0, name: 'ม.ค.' },
  { value: 1, name: 'ก.พ.' },
  { value: 2, name: 'มี.ค.' },
  { value: 3, name: 'เม.ย.' },
  { value: 4, name: 'พ.ค.' },
  { value: 5, name: 'มิ.ย.' },
  { value: 6, name: 'ก.ค.' },
  { value: 7, name: 'ส.ค.' },
  { value: 8, name: 'ก.ย.' },
  { value: 9, name: 'ต.ค.' },
  { value: 10, name: 'พ.ย.' },
  { value: 11, name: 'ธ.ค.' }
];

export const DAY_LIST = [
  { value: 0, name: 'จันทร์' },
  { value: 1, name: 'อังคาร' },
  { value: 2, name: 'พุธ' },
  { value: 3, name: 'พฤหัสยดี' },
  { value: 4, name: 'ศุกร์' },
  { value: 5, name: 'เสาร์' },
  { value: 6, name: 'อาทิตย์' }
];

export const MENU = {
  th:[
    {
      url: "/main/dashboard", icon: "dashboard", title: "หน้าหลัก",
      span:false,
      child:[
        
      ]
    },
    {
      url: "/main/setting", icon: "settings_applications", title: "ตั้งค่า",
      span:false,
      child:[
        
      ]
    },
    {
      url: "/main/management", icon: "directions_car", title: "แผงควบคุม",
      span:false,
      child:[
        {url: "/main/management", icon: "keyboard_arrow_right", title: "จองที่จอดรถ"}
      ]
    },
    {
      url: "/main/report", icon: "poll", title: "รายงาน",
      span:false,
      child:[
        
      ]
    },
  ],
  en:[
    {
      url: "/main/dashboard", icon: "dashboard", title: "Dashboard",
      span:false,
      child:[
        
      ]
    },
    {
      url: "/main/setting", icon: "settings_applications", title: "Setting",
      span:false,
      child:[
        
      ]
    },
    {
      url: "/main/management", icon: "directions_car", title: "Parking Control",
      span:false,
      child:[
        {url: "/main/management", icon: "keyboard_arrow_right", title: "reservation"}
      ]
    },
    {
      url: "/main/report", icon: "poll", title: "Report",
      span:false,
      child:[
        
      ]
    },
  ],
}
