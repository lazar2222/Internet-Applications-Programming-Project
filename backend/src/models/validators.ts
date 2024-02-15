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
    return (arr:Array<String>) => 
    {
        if(arr.length <= maxLen)
        {
            for (var elem of arr)
            {
                if(!validator(elem))
                {
                    return false
                }
            }
            return true
        }
        return false
    }
}