
export function badRequest(message: string){
   return {
      statusCode: 400,
      body: message
   }
}

export function serverError(){
   return { statusCode: 500, body: "something went wrong" }
}

export function ok(b: any){
   return {
      statusCode: 200,
      body: b
   }
}

export function created<T>(b: T){
   return {
      statusCode: 201,
      body: b
   }
}