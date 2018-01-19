import * as localforage from 'localforage'
type Item = string | null

export interface SetUserData {
  url: string
  rootUser: string
}

export interface UserData {
  isValid?: boolean
  url: Item
  rootUser: Item
}

localforage.config({
  name: 'Udaru Admin'
})

export async function getUserData(): Promise<UserData> {
  const [url, rootUser] = await Promise.all([
    localforage.getItem<Item>('url'),
    localforage.getItem<Item>('rootUser')
  ])

  return {
    url,
    rootUser
  }
}

export async function setUserData(
  userData: SetUserData
): Promise<SetUserData | Error> {
  try {
    const [url, rootUser] = await Promise.all([
      // trim trailing slash in url
      localforage.setItem<string>('url', userData.url.replace(/\/$/, '')),
      localforage.setItem<string>('rootUser', userData.rootUser)
    ])
    return {
      url,
      rootUser
    }
  } catch (error) {
    return error
  }
}
