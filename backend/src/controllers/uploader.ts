import multer from 'multer'

const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/profile')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    var ext = file.mimetype == 'image/png'? '.png' : '.jpg'
    cb(null, uniqueSuffix+ext)
  }
})

const workshopStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/workshop')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    var ext = file.mimetype == 'image/png'? '.png' : '.jpg'
    cb(null, uniqueSuffix+ext)
  }
})

export const profileUpload = multer({ storage: profileStorage, fileFilter: function (req, file, cb) {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg')
    {
      cb(null, true)
    }
    else
    {
        cb(null, false)
    }
}})

export const workshopUpload = multer({ storage: workshopStorage, fileFilter: function (req, file, cb) {
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg')
  {
      cb(null, true)
  }
  else
  {
      cb(null, false)
  }
}})