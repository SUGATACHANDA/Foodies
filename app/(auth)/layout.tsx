const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return( <div className="flex items-center justify-center h-[calc(100%-100px)]">
        {children}
    </div> )
}
export default AuthLayout