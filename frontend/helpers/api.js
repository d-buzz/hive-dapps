export async function getCategories(axios) {
  const payload = await axios.get(`categories`)
  return payload.data.categories
}

export async function getApps(axios, params) {
  try {
    const payload = await axios.get(`apps/`, {
      params
    })
    return payload.data
  } catch (error) {
    console.error('getApps', error)
  }
}

export async function getGlobal(axios) {
  try {
    const payload = await axios.get(`global/`)
    return payload.data
  } catch (error) {
    console.error('getGlobal', error)
  }
}

export async function getApp(axios, name) {
  try {
    const payload = await axios.get(`apps/${name}`)
    return payload.data.app
  } catch (error) {
    console.error('getApps', error)
  }
}
