"use server"

// import sqlite3 from "sqlite3"

import sql from "mssql"
const config = {
  server: process.env.DB_SERVER || "localhost",
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "yourStrong(!)Password",
  database: process.env.DB_DATABASE || "portal",
  options: {
    ssl: false,
    encrypt: false, // Use this if your SQL Server uses SSL
  },
}

async function executeCreation() {
  try {
    await sql.connect(config)
    await sql.query`IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tokens]') AND type in (N'U'))
      BEGIN
          CREATE TABLE [dbo].[tokens] (
              [id] INT PRIMARY KEY,
              [access_token] VARCHAR(255) NOT NULL,
              [expires_in] INT NOT NULL,
              [refresh_token] VARCHAR(255) NOT NULL,
              [scope] VARCHAR(255) NOT NULL,
              [token_type] VARCHAR(255) NOT NULL,
              [creation] VARCHAR(255) NOT NULL,
              [created_at] DATETIME DEFAULT CURRENT_TIMESTAMP
          );
      END
      `
    // buscar tokens
    // const tokens = await sql.query`SELECT * FROM portal.dbo.tokens`
    // console.log("tokens", tokens.recordset)
  } catch (error) {
    console.error("Erro ao conectar com o banco:", error)
  }
}

export async function getBlingInviteLinkFromDotEnv() {
  return process.env.BLING_INVITE_LINK
}
// export async function getTokenHandler(args: { code: string; state: string }): Promise<{
//   output?: any
//   error?: any
// }> {
//   const db = new sqlite3.Database("BlingTokensDb.sqlite")

//   await CreateTableIfNotExist(db)

//   const response = await GetResponseFromBling(args)

//   if (response.error) {
//     return {
//       error: {
//         message: "Error while trying to get token from Bling",
//         error: response.error,
//       },
//     }
//   }

//   await AsyncInsertToken(db, response)

//   await CloseConnection(db)

//   return {
//     output: response,
//   }
// }
export async function getTokenHandler(args: { code: string; state: string }): Promise<{
  output?: any
  error?: any
}> {
  await executeCreation()
  const response = await GetResponseFromBling(args)

  if (response.error) {
    return {
      error: {
        message: "Error while trying to get token from Bling",
        error: response.error,
      },
    }
  }

  await sql.connect(config)
  await sql.query`INSERT INTO [dbo].[tokens] (id, access_token, expires_in, refresh_token, scope, token_type, creation) VALUES (${1}, ${
    response.access_token
  }, ${response.expires_in}, ${response.refresh_token}, ${response.scope}, ${
    response.token_type
  }, ${new Date().toLocaleDateString("pt-BR")})`

  return {
    output: response,
  }
}

// export async function readTokens(pass: string) {
//   if (!pass) {
//     return {
//       error: {
//         message: "Error while trying to read tokens from Bling",
//         error: "Missing password",
//       },
//     }
//   }
//   if (pass !== process.env.BLING_DELETE_TOKENS_PASSWORD) {
//     return {
//       error: {
//         message: "Error while trying to read tokens from Bling",
//         error: "Wrong password",
//       },
//     }
//   }

//   const db = new sqlite3.Database("BlingTokensDb.sqlite")

//   await CreateTableIfNotExist(db)

//   const tokens = await AsyncReadTokens(db)

//   await CloseConnection(db)

//   return tokens
// }
export async function readTokens(pass: string) {
  if (!pass) {
    return {
      error: {
        message: "Error while trying to read tokens from Bling",
        error: "Missing password",
      },
    }
  }

  if (pass !== process.env.BLING_DELETE_TOKENS_PASSWORD) {
    return {
      error: {
        message: "Error while trying to read tokens from Bling",
        error: "Wrong password",
      },
    }
  }

  await executeCreation()
  const tokens = await sql.query`SELECT * FROM portal.dbo.tokens`

  return tokens.recordset
}

// export async function deleteTokens(args: { ids: number[]; password: string }) {
//   console.log("args", args)
//   console.log(process.env.BLING_DELETE_TOKENS_PASSWORD)
//   if (args.password !== process.env.BLING_DELETE_TOKENS_PASSWORD) {
//     return {
//       error: {
//         message: "Error while trying to delete tokens from Bling",
//         error: "Wrong password",
//       },
//     }
//   }
//   const db = new sqlite3.Database("BlingTokensDb.sqlite")

//   await AsyncDeleteTokens(db, args.ids)

//   await CloseConnection(db)

//   return {
//     output: {
//       message: "Tokens deleted successfully",
//     },
//   }
// }
export async function deleteTokens(args: { ids: number[]; password: string }) {
  if (args.password !== process.env.BLING_DELETE_TOKENS_PASSWORD) {
    return {
      error: {
        message: "Error while trying to delete tokens from Bling",
        error: "Wrong password",
      },
    }
  }

  await executeCreation()
  await sql.query`DELETE FROM [dbo].[tokens] WHERE id IN (${args.ids.join(",")})`

  return {
    output: {
      message: "Tokens deleted successfully",
    },
  }
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * Utils area
 */

async function GetResponseFromBling(args: { code: string; state: string }): Promise<any> {
  const { code, state } = args
  const url = "https://bling.com.br/Api/v3/oauth/token"
  const clientId = process.env.BLING_CLIENT_ID
  const clientSecret = process.env.BLING_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    return {
      error: {
        message: "Error while trying to get token from Bling",
        error: "Missing clientId or clientSecret",
      },
    }
  }
  const credenciais = `${clientId}:${clientSecret}`
  const base64 = Buffer.from(credenciais).toString("base64")
  const body = new URLSearchParams()
  body.append("grant_type", "authorization_code")
  body.append("code", code)
  body.append("state", state)

  // Removed 'mode: "no-cors"' as this mode doesn't allow you to access the response data
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "1.0",
      Authorization: `Basic ${base64}`,
    },
    body: body.toString(), // Convert URLSearchParams to string
  }).catch((err) => {
    return {
      json: () => {
        return { error: err }
      },
    }
  })

  const data = await response.json()
  return data
}

// async function CreateTableIfNotExist(db: sqlite3.Database) {
//   const asyncCreate = new Promise((resolve, reject) => {
//     db.run(
//       `CREATE TABLE IF NOT EXISTS tokens (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         access_token TEXT,
//         expires_in INTEGER,
//         refresh_token TEXT,
//         scope TEXT,
//         token_type TEXT,
//         creation TEXT,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//       )`,
//       (err) => {
//         if (err) {
//           reject(err)
//         } else {
//           resolve({ message: "Table created successfully" })
//         }
//       }
//     )
//   })
//   await asyncCreate
// }

// async function CloseConnection(db: sqlite3.Database) {
//   const asyncClose = new Promise((resolve, reject) => {
//     db.close((err) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve({ message: "Database connection closed successfully" })
//       }
//     })
//   })
//   await asyncClose
// }

// async function AsyncInsertToken(
//   db: sqlite3.Database,
//   data: {
//     access_token: string
//     expires_in: number
//     refresh_token: string
//     scope: string
//     token_type: string
//   }
// ) {
//   const asyncInsert = new Promise((resolve, reject) => {
//     db.run(
//       `INSERT INTO tokens (access_token, expires_in, refresh_token, scope, token_type, creation) VALUES (?, ?, ?, ?, ?, ?)`,
//       [
//         data.access_token,
//         data.expires_in,
//         data.refresh_token,
//         data.scope,
//         data.token_type,
//         new Date().toLocaleDateString("pt-BR"),
//       ],
//       (err) => {
//         if (err) {
//           reject(err)
//         } else {
//           resolve({ message: "Data inserted successfully" })
//         }
//       }
//     )
//   })
//   await asyncInsert
// }

// async function AsyncReadTokens(db: sqlite3.Database) {
//   let tokens: any[] = []
//   const asyncReadAndLog = new Promise((resolve, reject) => {
//     db.all(`SELECT * FROM tokens`, (err, rows) => {
//       if (err) {
//         reject(err)
//       } else {
//         tokens = rows
//         resolve({ message: "Data read successfully" })
//       }
//     })
//   })
//   await asyncReadAndLog
//   return tokens
// }

// async function AsyncDeleteTokens(db: sqlite3.Database, ids: number[]) {
//   const asyncDelete = new Promise((resolve, reject) => {
//     db.run(`DELETE FROM tokens WHERE id IN (${ids.join(",")})`, (err) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve({ message: "Data deleted successfully" })
//       }
//     })
//   })
//   await asyncDelete
// }
