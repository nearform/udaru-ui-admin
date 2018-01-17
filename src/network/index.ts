import { getUserData } from '../user-data'

export interface FetchOrganizationsResponse {
  data?: {
    organizations: Array<{
      description: string
      id: string
      name: string
    }>
  }
  redirect?: boolean
  error?: Error | null
}

export interface Settings {
  url: string
  rootUser: string
  isValid: boolean
}

const timeout = (ms: Number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms))

const getSettings = async (): Promise<Settings> => {
  const userData = await getUserData()
  const { url, rootUser } = userData

  return {
    url: url || '',
    rootUser: rootUser || '',
    isValid: Boolean(userData.url) && Boolean(userData.rootUser)
  }
}

export interface GenericFetchProps<T> {
  redirect?: boolean
  error?: Error | null
  data?: T
}

export const fetchOrganizations = async <T>(): Promise<
  GenericFetchProps<T>
> => {
  const settings = await getSettings()
  if (!settings.isValid) {
    return {
      redirect: true
    }
  }

  try {
    const url = `${settings.url}/authorization/organizations`
    const headers = {
      authorization: settings.rootUser
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
      mode: 'cors'
    })

    await timeout(500)

    if (!response.ok) {
      throw new Error('bad network request')
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    return {
      error
    }
  }
}
