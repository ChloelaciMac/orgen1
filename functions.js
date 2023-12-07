import supabase from '../Supabase.js'

const getWords = async () => {
    const user = await supabase.auth.getUser()
    const uuid = user.data.user.id
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', uuid)
    if (error) {
        throw error
    }
    return data[0].wordcount
}

const initialCheck = async () => {
    const user = await supabase.auth.getUser()
    const uuid = user.data.user.id
    const { data, error } = await supabase
        .rpc('check_and_update_user_activity', { p_id: uuid, p_current_time: new Date() })

    if (error) {
        throw error
    }
    console.log(data)
}


const checkUserPlan = async () => {
    const user = await supabase.auth.getUser()
    const uuid = user.data.user.id
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', uuid)
    if (error) {
        throw error
    }
    if ((data[0]?.cust_id === "" || data[0]?.cust_id === null)
    && (data[0]?.plan === "" || data[0]?.plan === null)
    ) {
        console.log('no plan')
        return false
    } else {
        return true
    }
}

const checkTableForDoc = async () => {
    const user = await supabase.auth.getUser()
    const uuid = user.data.user.id
    supabase.rpc('check_or_create_table', {
        _tbl: uuid
    }).then(res => {
        //console.log(res)
    }).catch(err => {
        console.log(err)
    })
    return uuid
}

export { getWords, checkUserPlan , initialCheck, checkTableForDoc}
