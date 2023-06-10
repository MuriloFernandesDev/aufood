/** @type {import('next').NextConfig} */
module.exports = {
   reactStrictMode: true,
   images: {
      domains: [
        'localhost',
        'localhost:8000',
        'beta.irrigacaopenapolis.com.br',
        'irrigacaopenapoilis.com.br',
        'irriga-plis.vercel.app',
        'irrigaplis-files.s3.us-east-2.amazonaws.com',
      ],
   },
}
