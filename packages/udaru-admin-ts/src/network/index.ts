import axios, { CancelTokenSource } from 'axios'
import { getUserData } from '../user-data'

export interface Settings {
  url: string
  rootUser: string
  isValid: boolean
}

export enum ComponentUnmountedMsg {
  RequestCancelled = 'component unmounted'
}

const getSettings = async (): Promise<Settings> => {
  const { url, rootUser } = await getUserData()

  return {
    url,
    rootUser,
    isValid: Boolean(url) && Boolean(rootUser)
  }
}

export interface GenericFetchProps<T> {
  redirect?: boolean
  error?: Error | null
  data?: T
}

export const fetchOrganizations = async <T>(
  source: CancelTokenSource
): Promise<GenericFetchProps<T>> => {
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

    const response = await axios.get(url, {
      headers,
      cancelToken: source.token
    })

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message)
    }
    return {
      error
    }
  }
}

export const fetchSingleOrganization = async <T>(
  source: CancelTokenSource,
  organizationId: string
): Promise<GenericFetchProps<T>> => {
  const settings = await getSettings()
  if (!settings.isValid) {
    return {
      redirect: true
    }
  }

  try {
    const url = `${settings.url}/authorization/organizations/${organizationId}`
    const headers = {
      authorization: settings.rootUser
    }

    return await axios.get(url, {
      headers,
      cancelToken: source.token
    })
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message)
    }
    return {
      error
    }
  }
}

export const fetchTeams = async <T>(
  source: CancelTokenSource,
  org?: string
): Promise<GenericFetchProps<T>> => {
  const settings = await getSettings()
  if (!settings.isValid) {
    return {
      redirect: true
    }
  }

  try {
    const url = `${settings.url}/authorization/teams`
    const headers = Boolean(org)
      ? { authorization: settings.rootUser, org }
      : {
          authorization: settings.rootUser
        }

    const response = await axios.get(url, {
      headers,
      cancelToken: source.token
    })

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message)
    }
    return {
      error
    }
  }
}

export const fetchUsers = async <T>(
  source: CancelTokenSource,
  org?: string
): Promise<GenericFetchProps<T>> => {
  const settings = await getSettings()
  if (!settings.isValid) {
    return {
      redirect: true
    }
  }

  try {
    const url = `${settings.url}/authorization/users`
    const headers = Boolean(org)
      ? { authorization: settings.rootUser, org }
      : {
          authorization: settings.rootUser
        }

    const response = await axios.get(url, {
      headers,
      cancelToken: source.token
    })

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message)
    }
    return {
      error
    }
  }
}

export const fetchPolicies = async <T>(
  source: CancelTokenSource,
  org?: string
): Promise<GenericFetchProps<T>> => {
  const settings = await getSettings()
  if (!settings.isValid) {
    return {
      redirect: true
    }
  }

  try {
    const url = `${settings.url}/authorization/policies`
    const headers = Boolean(org)
      ? { authorization: settings.rootUser, org }
      : {
          authorization: settings.rootUser
        }

    const response = await axios.get(url, {
      headers,
      cancelToken: source.token
    })

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message)
    }
    return {
      error
    }
  }
}
