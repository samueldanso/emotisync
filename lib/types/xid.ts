export interface XIDTransactionDetails {
  contract_address: string
  contract_abi: any[]
  input_params: {
    _profileParams: any
    _profileData: any
  }
}

export interface XIDMintingHook {
  mintXId: (txDetails: XIDTransactionDetails) => Promise<boolean>
}
