const fs = require('fs')

export function fileValidator(prefix: String)
{
    return (path) =>
    {
        return path == null || fs.existsSync('files/'+prefix+'/'+path)
    }
}

export function mandatoryFileValidator(prefix: String)
{
    return (path) =>
    {
        return path != null && fs.existsSync('files/'+prefix+'/'+path)
    }
}

export function ArrayValidator(validator, maxLen)
{
    return (arr) => 
    {
        if(arr <= maxLen)
        {
            for (var elem of arr)
            {
                if(!validator(elem))
                {
                    return false
                }
            }
        }
        return false
    }
}